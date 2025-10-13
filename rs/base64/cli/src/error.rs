use std::{io, path::PathBuf};

use thiserror::Error;

use base64::base64;

#[derive(Debug, Error)]
pub(crate) enum AppError {
    #[error("failed to convert: invalid base64")]
    ParseBase64(#[from] base64::ParseError),

    #[error("failed to read {path}: {source}")]
    ReadFile {
        path: PathBuf,
        #[source]
        source: io::Error,
    },
}
