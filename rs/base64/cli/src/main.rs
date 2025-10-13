mod config;
mod error;

use std::{
    fs,
    io::{self, Read},
    path::PathBuf,
    process,
};

use clap::Parser;

use base64::{base64::Base64, bytes::Bytes};

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
        Command::Encode { path } => encode(path),
        Command::Decode { path } => decode(path),
    }
}

fn encode(path: Option<PathBuf>) -> Result<(), AppError> {
    let bytes = read_input(path)?;
    let bytes = Bytes::from(bytes);
    let s = bytes.encode().to_string();
    print!("{s}");
    Ok(())
}

fn decode(path: Option<PathBuf>) -> Result<(), AppError> {
    let bytes = read_input(path)?;
    let base64 = Base64::try_from(bytes)?;
    let s = base64.decode().to_string();
    print!("{s}");
    Ok(())
}

fn read_input(path: Option<PathBuf>) -> Result<Vec<u8>, AppError> {
    match path {
        Some(path) => fs::read(&path).map_err(|source| AppError::ReadFile { path, source }),
        None => {
            let mut buf = vec![];
            let _ = io::stdin().read_to_end(&mut buf);
            Ok(buf)
        }
    }
}
