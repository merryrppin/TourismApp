CREATE TABLE [dbo].[tblFotoPuntoSenderismo]
(
	[IdFotoPuntoSendersimo] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[UrlFoto] VARCHAR(500) NOT NULL,
	[IdPuntoSendersimo] INT NOT NULL,
    CONSTRAINT [FK_tblFotoPuntoSenderismo_tblPuntoSenderismo] FOREIGN KEY ([IdPuntoSendersimo]) REFERENCES [tblPuntoSenderismo]([IdPuntoSendersimo]),
)
