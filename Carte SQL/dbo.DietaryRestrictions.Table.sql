USE [Carte]
GO
/****** Object:  Table [dbo].[DietaryRestrictions]    Script Date: 8/30/2022 7:11:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DietaryRestrictions](
	[MenuItemId] [int] NOT NULL,
	[FoodSafeTypeId] [int] NOT NULL,
 CONSTRAINT [PK__DietaryR__694AA0EFD2388957] PRIMARY KEY CLUSTERED 
(
	[MenuItemId] ASC,
	[FoodSafeTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DietaryRestrictions]  WITH CHECK ADD  CONSTRAINT [FK_DietaryRestrictions_FoodSafeTypes] FOREIGN KEY([FoodSafeTypeId])
REFERENCES [dbo].[FoodSafeTypes] ([Id])
GO
ALTER TABLE [dbo].[DietaryRestrictions] CHECK CONSTRAINT [FK_DietaryRestrictions_FoodSafeTypes]
GO
ALTER TABLE [dbo].[DietaryRestrictions]  WITH CHECK ADD  CONSTRAINT [FK_DietaryRestrictions_MenuItems] FOREIGN KEY([MenuItemId])
REFERENCES [dbo].[MenuItems] ([Id])
GO
ALTER TABLE [dbo].[DietaryRestrictions] CHECK CONSTRAINT [FK_DietaryRestrictions_MenuItems]
GO
