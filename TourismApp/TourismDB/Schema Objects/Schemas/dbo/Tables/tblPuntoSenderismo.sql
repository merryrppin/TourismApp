CREATE TABLE [dbo].[tblPuntoSenderismo]
(
	[IdPuntoSendersimo] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Latitud] FLOAT NOT NULL,
	[Longitud] FLOAT NOT NULL,
	[Altitud] FLOAT,
	[IdRutaAlternativa] INT NOT NULL,
	[Orden] INT NOT NULL,
    CONSTRAINT [FK_tblPuntoSenderismo_tblRutaAlternativa] FOREIGN KEY ([IdRutaAlternativa]) REFERENCES [tblRutaAlternativa]([IdRutaAlternativa])
)
