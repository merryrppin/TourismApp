CREATE TABLE [dbo].[tblPuntoReferencia]
(
	[IdPuntoReferencia] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombrePunto] VARCHAR(250) NOT NULL,
	[NombrePuntoENG] VARCHAR(250),
	[DescripcionPunto] VARCHAR(MAX),
	[DescripcionPuntoENG] VARCHAR(MAX),
	[FotoPrincipal] VARCHAR(500),
	[Orden] INT NOT NULL
)
