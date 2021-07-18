--[dbo].[tblMunicipio]
SET IDENTITY_INSERT [dbo].[tblMunicipio] ON

INSERT INTO [dbo].[tblMunicipio]([IdMunicipio], [NombreMunicipio], [Activo]) VALUES
(1, 'Girardota', 1);

SET IDENTITY_INSERT [dbo].[tblMunicipio] OFF

--[dbo].[tblSitioTuristico]
SET IDENTITY_INSERT [dbo].[tblSitioTuristico] ON

INSERT INTO [dbo].[tblSitioTuristico]([IdSitioTuristico], [NombreSitioTuristicoESP], [IdMunicipio], [Latitud], [Longitud], [Activo]) VALUES
(1, 'Parque Principal Girardota', 1, 6.3747376, -75.4499254, 1),
(2, 'Placa Deportiva Barrio el Paraíso', 1, 6.3742815, -75.4463368, 1),
(3, 'Comfama Girardota', 1, 6.3774803, -75.4505639, 1);

SET IDENTITY_INSERT [dbo].[tblSitioTuristico] OFF
