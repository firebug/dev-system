
const PATH = require("path");
const FS = require("fs-extra");
const Q = require("q");
const COMMANDER = require("commander");
const COLORS = require("colors");
const SPAWN = require("child_process").spawn;
const SMI = require("smi.cli");
const FIREFOX = require("io.devcomp.tool.firefox/source");


COLORS.setTheme({
    error: 'red'
});


function loadProfiles(callback) {

    // TODO: Fetch this using meta system instead of going to config file directly.
    return SMI.readDescriptor(PATH.join(__dirname, "../../../package.json"), {
        basePath: PATH.join(__dirname, "../../.."),
        resolve: true
    }, function(err, descriptor) {
        if (err) return callback(err);
        var profiles = descriptor.services.tools["tools.cli.dev"].config.profiles;
        for (var profileName in profiles) {
            if (profiles[profileName].extensions) {
                for (var extensionName in profiles[profileName].extensions) {
                    if (/^\.\//.test(profiles[profileName].extensions[extensionName].location)) {
                        profiles[profileName].extensions[extensionName].location = PATH.join(__dirname, "../../..", profiles[profileName].extensions[extensionName].location);
                    } else
                    if (/^\.\//.test(profiles[profileName].extensions[extensionName])) {
                        profiles[profileName].extensions[extensionName] = PATH.join(__dirname, "../../..", profiles[profileName].extensions[extensionName]);
                    }
                }
            }
        }
        return callback(null, profiles);
    });
}


function main(callback) {
    try {

        var program = new COMMANDER.Command();

        program
            .version(JSON.parse(FS.readFileSync(PATH.join(__dirname, "/package.json"))).version);

        var acted = false;

        program
            .command("list")
            .description("List all available profiles")
            .action(function(name) {
                acted = true;
                return loadProfiles(function (err, profiles) {
                    if (err) return callback(err);

                    console.log("Available profiles:");

                    for (var name in profiles) {
                        console.log("  " + name);
                    }

                    return callback(null);
                });
            });

        program
            .command("run <name>")
            .description("Run a profile")
            .option("--detach", "Detach from the browser process (startup logs will not be visible!)")
            .action(function(name, options) {
                acted = true;
                return loadProfiles(function (err, profiles) {
                    if (err) return callback(err);

                    if (!profiles[name]) {
                        return callback("Profile '" + name + "' not declared! See 'profile list'.");
                    }

                    profiles[name].verbose = true;
                    profiles[name].debug = true;

                    console.log("Launching profile '" + name + "' with config:", JSON.stringify(profiles[name], null, 4));

                    if (
                        profiles[name].run &&
                        profiles[name].path
                    ) {
                        function provision() {
                            if (!profiles[name].extensions && !profiles[name].run) {
                                return Q.resolve();
                            }
                            return Q.denodeify(function(callback) {
                                return FIREFOX.provision(profiles[name]).then(function(profile) {
                                    return callback(null, profile);
                                }).fail(callback);
                            })();
                        }

                        return provision().then(function(profile) {
                            return Q.denodeify(function(callback) {

                                var run = profiles[name].run;
                                run = run.replace(/%profiledir%/g, profile._profileBasePath);
                                run = run.replace(/%browserbin%/g, profile._descriptor.config.browser.binPath);

                                var proc = SPAWN(
                                    run.split(" ").shift(),
                                    run.split(" ").slice(1),
                                    {
                                        cwd: PATH.join(__dirname, "../../..", profiles[name].path)
                                    }
                                );
                                proc.on("error", function(err) {
                                    return callback(err);
                                });
                                proc.stdout.on("data", function(data) {
                                    process.stdout.write(data);
                                });
                                proc.stderr.on("data", function(data) {
                                    process.stderr.write(data);
                                });
                                proc.on("exit", function(code) {
                                    if (code !== 0) {
                                        console.error(new Error("Browser stopped with error!"));
                                    }
                                    console.log("Browser stopped!");
                                });
                                if (options.detach) {
                                    return callback(null);
                                }
                                // We are not calling `callback` on purpose here!
                                return;
                            })();
                        }).then(function() {
                            return callback(null);
                        }).fail(callback);                      
                    } else {
                        return FIREFOX.open(profiles[name]).then(function(profile) {
                            console.log("Firefox done!");
                        }).then(function() {
                            if (options.detach) {
                                return callback(null);
                            }
                            // We are not calling `callback` on purpose here!
                            return;
                        }).fail(callback);
                    }
                });
            });

        program.parse(process.argv);

        if (!acted) {
            var command = process.argv.slice(2).join(" ");
            if (command) {
                console.error(("ERROR: Command '" + process.argv.slice(2).join(" ") + "' not found!").error);
            }
            program.outputHelp();
            return callback(null);
        }

    } catch(err) {
        return callback(err);
    }
}


if (require.main === module) {

    return main(function(err) {
        if (err) {
            if (typeof err === "string") {
                console.error((""+err).red);
            } else
            if (typeof err === "object" && err.stack) {
                console.error((""+err.stack).red);
            }
            process.exit(1);
        }
        process.exit(0);
    });

}