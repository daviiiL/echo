{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-23.11") { } }:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    # packages
    nodejs
    nodePackages.create-react-app
    nodePackages.npm
  ];
}
