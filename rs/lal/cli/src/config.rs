use clap::{Parser, Subcommand};

#[derive(Debug, Parser)]
pub(crate) struct Config {
    #[command(subcommand)]
    pub(crate) command: Command,
}

#[derive(Debug, Subcommand)]
pub(crate) enum Command {
    Encode,
    Decode,
}
