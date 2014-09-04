
const PATH = require("path");
const FS = require("fs-extra");
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
        return callback(null, descriptor.services.tools["tools.cli.dev"].config.profiles);
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
            .action(function(name, options) {
                acted = true;
                return loadProfiles(function (err, profiles) {
                    if (err) return callback(err);

                    if (!profiles[name]) {
                        return callback("Profile '" + name + "' not declared! See 'profile list'.");
                    }

                    console.log("Launching profile '" + name + "' with config:", JSON.stringify(profiles[name], null, 4));

                    return FIREFOX.open(profiles[name]).then(function(profile) {
                        console.log("Firefox done!");
                    }).then(function() {
                        return callback(null);
                    }).fail(callback);
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
