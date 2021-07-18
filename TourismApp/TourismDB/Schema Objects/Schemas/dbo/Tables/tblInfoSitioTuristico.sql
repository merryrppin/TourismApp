CREATE TABLE [dbo].[tblInfoSitioTuristico]
(
	[IdInfoSitioTuristico] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[DescripcionESP] VARCHAR(MAX) NULL,
	[DescripcionENG] VARCHAR(MAX) NULL, 
	[Imagen] VARCHAR(MAX) NULL,
    CONSTRAINT [FK_tblInfoSitioTuristico_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico])
)
