CREATE TABLE [dbo].[tblSitiosGastronomicosDetalle]
(
	[IdSitioGastronomico] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[NombreSitioEsp] VARCHAR(100) NOT NULL,
	[NombreSitioEng] VARCHAR(100) NULL,
	[Descripcion] VARCHAR(500) NOT NULL,
	[Imagen] VARCHAR(500) NULL,
	[Latitud] DECIMAL(12, 9) NOT NULL,
	[Longitud] DECIMAL(12, 9) NOT NULL,
	[Altitud] DECIMAL(12, 9) NULL,
	[Facebook] VARCHAR(200) NULL,
	[Instagram] VARCHAR(200) NULL,
	[Whatsapp] VARCHAR(200) NULL,
	[Telefono] VARCHAR(10) NULL,
    CONSTRAINT [FK_TblSitiosGastronomicosDetalle_tblSitiosGastronomico] FOREIGN KEY ([IdSitioGastronomico]) REFERENCES [tblSitiosGastronomico]([IdSitioGastronomico])
)
