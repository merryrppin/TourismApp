CREATE TABLE [dbo].[tblSitioTuristicoRangoEdad]
(
	[IdSitioTuristicoRangoEdad] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[IdRangoEdad] INT NOT NULL, 
    CONSTRAINT [FK_tblSitioTuristicoRangoEdad_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico]), 
    CONSTRAINT [FK_tblSitioTuristicoRangoEdad_tblRangoEdad] FOREIGN KEY ([IdRangoEdad]) REFERENCES [tblRangoEdad]([IdRangoEdad]),
)
