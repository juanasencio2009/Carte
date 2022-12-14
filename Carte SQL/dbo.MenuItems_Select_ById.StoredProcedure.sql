USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Select_ById]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 25Aug2022
-- Description:	A proc to Select by Id from dbo.MenuItems.
-- Code Reviewer: Luis Rios


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Select_ById]
			@Id int
as
/*
Declare
			@Id int = 1

Execute dbo.MenuItems_Select_ById @Id

Select *
from dbo.MenuItems
--Select *
--from dbo.Organizations
--Select *
--from dbo.StatusTypes
Select *
from dbo.MenuItemIngredients
Select *
from dbo.Ingredients
Select *
from dbo.DietaryRestrictions
Select *
from dbo.FoodSafetypes
*/

BEGIN
SELECT mi.Id
      ,mi.[OrganizationId]
	  ,o.Name
	  ,o.Logo
	  ,o.SiteUrl
      ,mi.[OrderStatusId]
	  ,st.Name as Status
      ,mi.[UnitCost]
      ,mi.[Name]
      ,mi.[Description]
      ,mi.[ImageUrl]
      ,mi.[CreatedBy]
      ,mi.[ModifiedBy]
      ,mi.[DateCreated]
      ,mi.[DateModified]
      ,mi.[IsDeleted]
	  ,Ingredients = ( Select i.Id
							,i.Name
							,i.UnitCost
							,i.ImageUrl
							,i.CreatedBy
						From dbo.Ingredients as i inner join dbo.MenuItemIngredients as mii
									on  i.Id = mii.IngredientId
								inner join dbo.MenuItems as mi
									on mi.Id = mii.MenuItemId
							Where mi.Id = @Id
						For JSON AUTO
						)
		,FoodSafeTypes = ( Select *
							From dbo.FoodSafeTypes as fst inner join dbo.DietaryRestrictions as dr
									on  fst.Id = dr.FoodSafeTypeId
								inner join dbo.MenuItems as mi
									on mi.Id = dr.MenuItemId
							Where mi.Id = @Id
						For JSON AUTO
						)
	  
  FROM dbo.MenuItems as mi 
		inner join dbo.Organizations as o
				on mi.OrderStatusId = o.Id
		inner join dbo.StatusTypes as st
				on mi.OrderStatusId = st.Id
		inner join dbo.Users as u
				on mi.CreatedBy = u.Id 
		inner join dbo.Users as u1 
				on mi.ModifiedBy = u1.Id

  Where mi.Id = @Id
END


GO
