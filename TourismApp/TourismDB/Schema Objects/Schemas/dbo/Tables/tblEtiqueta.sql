CREATE TABLE [dbo].[tblEtiqueta]
(
	[IdEtiqueta] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreEtiquetaESP] VARCHAR(250) NOT NULL,
	[NombreEtiquetaENG] VARCHAR(250) NULL,
	[Codigo] VARCHAR(10) NULL
)
