CREATE TABLE [dbo].[tblInfoSitioTuristico]
(
	[IdInfoSitioTuristico] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[Titulo] VARCHAR(250) NULL,
	[TituloENG] VARCHAR(250) NULL,
	[DescripcionESP] VARCHAR(MAX) NULL,
	[DescripcionENG] VARCHAR(MAX) NULL, 
	[Imagen] VARCHAR(MAX) NULL,
    [Orden] INT NOT NULL DEFAULT 0
)
