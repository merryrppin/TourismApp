CREATE TABLE [dbo].[tblSitioturisticoEtiqueta]
(
	[IdSitioturisticoEtiqueta] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[IdEtiqueta] INT NOT NULL, 
    CONSTRAINT [FK_tblSitioturisticoEtiqueta_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico]), 
    CONSTRAINT [FK_tblSitioturisticoEtiqueta_tblEtiqueta] FOREIGN KEY ([IdEtiqueta]) REFERENCES [tblEtiqueta]([IdEtiqueta]),
)
