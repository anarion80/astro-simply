{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  # https://devenv.sh/basics/
  env.GREET = "astro-simply devenv";

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    # pkgs.nodePackages.npm # globally install npm
    # pkgs.nodePackages.prettier
    # pkgs.nodejs_23
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    npm.install.enable = true;
  };
  languages.typescript.enable = true;

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  scripts.install-deps.exec = "npm install";
  scripts.run-dev.exec = "npm run dev";

  enterShell = ''
    hello
    git --version
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
  dotenv.enable = true;

  # Optionally, you can choose which filename to load.
  #
  # dotenv.filename = ".env.production";
  # or
  dotenv.filename = [".env.production" ".env.development"];
}
