CREATE TABLE tblGaleriaFotos
(
IdGaleriaFotosST INT IDENTITY(1,1) PRIMARY KEY,
IdSitioTuristico INT,
UrlFoto VARCHAR(500),
FechaCreacion DATETIME DEFAULT GETDATE(),
CONSTRAINT [FK_tblGaleriaFotos_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico])
)