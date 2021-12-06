--[tblUsuarioWeb] Password : 123456
insert into tblUsuarioWeb (UserName,Email,[Password])
select 'admin','admin@correo.com','wEW6Tok99ik='

--[dbo].[tblMunicipio]
SET IDENTITY_INSERT [dbo].[tblMunicipio] ON

INSERT INTO [dbo].[tblMunicipio]([IdMunicipio], [NombreMunicipio], [Activo]) VALUES
(1, 'Girardota', 1);

SET IDENTITY_INSERT [dbo].[tblMunicipio] OFF


SET IDENTITY_INSERT [dbo].[tblTipoSitioTuristico] ON
--[dbo].[tblTipoSitioTuristico]
INSERT INTO [tblTipoSitioTuristico] (IdTipoSitioTuristico,Nombre,[Codigo]) VALUES
(1,'Religioso','RGS'),
(2,'Senderismo','SDM'),
(3,'Gastronomia','GTM')
SET IDENTITY_INSERT [dbo].[tblTipoSitioTuristico] OFF

--[dbo].[tblSitioTuristico]
SET IDENTITY_INSERT [dbo].[tblSitioTuristico] ON

INSERT INTO [dbo].[tblSitioTuristico](
	[IdSitioTuristico],
	[NombreSitioTuristicoESP],
	[NombreSitioTuristicoENG],
	[IdMunicipio],
	[Latitud], 
	[Longitud], 
	[Activo],
	[IconoMarcador],
	[DescripcionESP],
	[DescripcionENG],
	[PresentacionESP],
	[PresentacionENG],
	[RutaESP],
	[RutaENG],
	[IdTipoSitioTuristico]
	) VALUES
(1, 'Parque Principal Girardota','principa park Girardota', 1, 6.3747376, -75.4499254, 1,'https://webflowers-wmalpha-rf.azurewebsites.net/Images/shopping-cart.png', 'Un sitio muy bonito','a very nice place','Presentando','Introducing','Voltiando en la esquina','Turning the corner',1),
(2, 'Placa Deportiva Barrio el Paraíso','The paradise', 1, 6.3742815, -75.4463368, 1,'https://webflowers-wmalpha-rf.azurewebsites.net/Images/mailbox.png', 'Un sitio muy bonito','a very nice place','Presentando','Introducing','Voltiando en la esquina','Turning the corner',2),
(3, 'Comfama Girardota','com.. Girardota', 1, 6.3774803, -75.4505639, 1,'https://webflowers-wmalpha-rf.azurewebsites.net/Images/placeholder.png', 'Un sitio muy bonito','a very nice place','Presentando','Introducing','Voltiando en la esquina','Turning the corner',3);


SET IDENTITY_INSERT [dbo].[tblSitioTuristico] OFF


--[dbo].[tblMunicipioCulturaGeneral]
SET IDENTITY_INSERT [dbo].[tblMunicipioCulturaGeneral] ON

INSERT INTO [dbo].[tblMunicipioCulturaGeneral]([IdMunicipioCulturaGeneral], [IdMunicipio], [IdCulturaGeneral], [Imagen], [ValorESP], [Orden]) VALUES
(1, 1, 1, NULL, 'Girardota es un municipio de Colombia, ubicado en el Valle de Aburrá del departamento de Antioquia. Limita por el norte con los municipios de San Pedro de los Milagros y Donmatías, por el este con los municipios de Barbosa y San Vicente, por el sur con los municipios de Barbosa y Guarne, y por el oeste con el municipio de Copacabana.

Su nombre se dio en honor al prócer de la patria Atanasio Girardot; no se le quiso bautizar Girardot pues en el departamento de Cundinamarca ya existía un municipio con ese nombre, por lo que se modificó a Girardota. También se llamó Hato Grande en alguna época con la esperanza de formar una ciudad.', 1);

SET IDENTITY_INSERT [dbo].[tblMunicipioCulturaGeneral] OFF

--[dbo].[tblInfoSitioTuristico]
SET IDENTITY_INSERT [dbo].[tblInfoSitioTuristico] ON

INSERT INTO [dbo].[tblInfoSitioTuristico]([IdInfoSitioTuristico],[IdSitioTuristico],[DescripcionESP],[Imagen]) VALUES
(1, 1, 'Es un espacio propicio para el encuentro e interacción cultural, religiosa y social.​​', NULL),
(2, 3, 'Comfama, contribuye al desarrollo social y a la generación de oportunidades para la población afiliada a través de programas y alianzas sociales, con la prestación directa de servicios sociales al trabajador afiliado y a su familia a precios inferiores al costo del mercado.', 'https://www.girardota.gov.co/MiMunicipio/PublishingImages/Paginas/Sitios-de-Interes/parque%20principal%20de%20girardota.jpg');

SET IDENTITY_INSERT [dbo].[tblInfoSitioTuristico] OFF