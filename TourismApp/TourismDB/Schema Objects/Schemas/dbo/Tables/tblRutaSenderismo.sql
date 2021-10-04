CREATE TABLE [dbo].[tblRutaSenderismo]
(
	[IdRutaSenderismo] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreRuta] VARCHAR(250) NOT NULL,
	[NombreRutaENG] VARCHAR(250) NOT NULL,
	[Descripcion] VARCHAR(MAX),
	[DescripcionENG] VARCHAR(MAX),
	[PuntoReferencia] VARCHAR(MAX),
	[PuntoReferenciaENG] VARCHAR(MAX),
	[FotoPortada] VARCHAR(500)
)
