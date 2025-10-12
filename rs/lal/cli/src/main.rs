mod config;
mod error;

use std::{
    io::{self, Read},
    process,
};

use clap::Parser;

use lal::{decodable::Decodable, encodable::Encodable};

use self::{
    config::{Command, Config},
    error::AppError,
};

fn main() {
    let config = Config::parse();

    if let Err(e) = run(config) {
        eprintln!("{e}");
        process::exit(1);
    }
}

fn run(config: Config) -> Result<(), AppError> {
    match config.command {
        Command::Encode => encode(),
        Command::Decode => decode(),
    }
}

fn encode() -> Result<(), AppError> {
    let s = read_stdin()?;
    let s = s.parse::<Encodable>().map(|e| e.encode().to_string())?;
    print!("{s}");
    Ok(())
}

fn decode() -> Result<(), AppError> {
    let s = read_stdin()?;
    let s = s.parse::<Decodable>().map(|d| d.decode().to_string())?;
    print!("{s}");
    Ok(())
}

fn read_stdin() -> Result<String, io::Error> {
    let mut buf = String::new();
    let _ = io::stdin().read_to_string(&mut buf)?;
    Ok(buf)
}
