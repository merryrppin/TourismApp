--[dbo].[tblDiaSemana]
SET IDENTITY_INSERT [dbo].[tblDiaSemana] ON

INSERT INTO [dbo].[tblDiaSemana]([IdDiaSemana], [NombreDiaESP], [NombreDiaENG], [NumeroDiaSemana]) VALUES
(1, 'Domingo', 'Sunday', 1),
(2, 'Lunes', 'Monday', 2),
(3, 'Martes', 'Tuesday', 3),
(4, 'Miércoles', 'Wednesday', 4),
(5, 'Jueves', 'Thursday', 5),
(6, 'Viernes', 'Friday', 6),
(7, 'Sábado', 'Saturday', 7);

SET IDENTITY_INSERT [dbo].[tblDiaSemana] OFF

--[dbo].[tblRangoEdad]
SET IDENTITY_INSERT [dbo].[tblRangoEdad] ON

INSERT INTO [dbo].[tblRangoEdad]([IdRangoEdad], [NombreRangoEdadESP], [EdadInicial], [EdadFinal], [Orden]) VALUES
(1, 'Infantil', 0, 5, 1),
(2, 'Niños', 6, 11, 2),
(3, 'Adolescente', 12, 17, 3),
(4, 'Adulto', 18, 64, 4),
(5, 'Adulto mayor', 60, 125, 5),
(6, 'Todas las edades', 0, 125, 6);

SET IDENTITY_INSERT [dbo].[tblRangoEdad] OFF

--[dbo].[tblCulturaGeneral]
SET IDENTITY_INSERT [dbo].[tblCulturaGeneral] ON

INSERT INTO [dbo].[tblCulturaGeneral]([IdCulturaGeneral], [NombreCulturaGeneralESP], [Codigo], [Activo]) VALUES
(1, 'Descripción nombre', 'NDESC', 1),
(2, 'Historia', 'HIST', 1);

SET IDENTITY_INSERT [dbo].[tblCulturaGeneral] OFF

SET IDENTITY_INSERT [dbo].[tblFiltroSenderismo] ON

INSERT INTO [dbo].[tblFiltroSenderismo]([NombreFiltroSenderismo], [NombreFiltroSenderismoENG], [Orden]) VALUES
('Nombre', 'Name', 100),
('Zona', 'Zone', 200),
('Vereda', 'Sidewalk', 300),
('Distancia(Km)', 'Distance(Km)', 400),
('Intensidad', 'Intensity', 500),
('Duración', 'Duration', 600);

SET IDENTITY_INSERT [dbo].[tblFiltroSenderismo] OFF

SET IDENTITY_INSERT [dbo].[tblTipoSitioTuristico] ON
--[dbo].[tblTipoSitioTuristico]
INSERT INTO [tblTipoSitioTuristico] (IdTipoSitioTuristico,Nombre,[Codigo]) VALUES
(1,'Religioso','RGS'),
(2,'Senderismo','SDM'),
(3,'Gastronomia','GTM'),
(4,'Fiestas oficiales','FTS'),
(5,'Lugares imperdibles','LIP'),
(6,'Por Defecto','DEF')
SET IDENTITY_INSERT [dbo].[tblTipoSitioTuristico] OFF

--[tblUsuarioWeb]
--Password : Girardota2021*
--User : girardota.turismoapp@hotmail.com
insert into tblUsuarioWeb (NombreUsuario,Email,[Password])
select 'admin','girardota.turismoapp@hotmail.com','gosgzg/xai+gFU7Sp4j26g=='

--[dbo].[tblMunicipio]
SET IDENTITY_INSERT [dbo].[tblMunicipio] ON

INSERT INTO [dbo].[tblMunicipio]([IdMunicipio], [NombreMunicipio], [Activo]) VALUES
(1, 'Girardota', 1);

SET IDENTITY_INSERT [dbo].[tblMunicipio] OFF
