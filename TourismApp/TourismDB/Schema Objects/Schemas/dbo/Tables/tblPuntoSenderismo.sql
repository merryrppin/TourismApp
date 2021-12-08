CREATE TABLE [dbo].[tblPuntoSenderismo]
(
	[IdPuntoSendersimo] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Latitud] DECIMAL(8, 6) NOT NULL,
	[Longitud] DECIMAL(9, 6) NOT NULL,
	[Altitud] FLOAT,
	[IdSitioTuristico] INT NOT NULL,
	[Orden] INT NOT NULL,
	[TimeRec] VARCHAR(50) NOT NULL,
    CONSTRAINT [FK_tblPuntoSenderismo_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico])
)
