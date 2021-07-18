﻿--[dbo].[tblMunicipio]
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


--[dbo].[tblMunicipioCulturaGeneral]
SET IDENTITY_INSERT [dbo].[tblMunicipioCulturaGeneral] ON

INSERT INTO [dbo].[tblMunicipioCulturaGeneral]([IdMunicipioCulturaGeneral], [IdMunicipio], [IdCulturaGeneral], [Imagen], [ValorESP], [Orden]) VALUES
(1, 1, 1, NULL, 'Girardota es un municipio de Colombia, ubicado en el Valle de Aburrá del departamento de Antioquia. Limita por el norte con los municipios de San Pedro de los Milagros y Donmatías, por el este con los municipios de Barbosa y San Vicente, por el sur con los municipios de Barbosa y Guarne, y por el oeste con el municipio de Copacabana.

Su nombre se dio en honor al prócer de la patria Atanasio Girardot; no se le quiso bautizar Girardot pues en el departamento de Cundinamarca ya existía un municipio con ese nombre, por lo que se modificó a Girardota. También se llamó Hato Grande en alguna época con la esperanza de formar una ciudad.', 1);

SET IDENTITY_INSERT [dbo].[tblMunicipioCulturaGeneral] OFF