USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Select_ByIngredientId]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Juan Asencio
-- Create date: 25Aug2022
-- Description:	A proc to select all the MenuItems that have a particular ingredient.
-- Code Reviewer: Luis Rios


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE proc [dbo].[MenuItems_Select_ByIngredientId]
--Joins MenuItems, MenuItemIngredients, Ingredients
--@foodQuery on FrontEnd should == 'string' == dbo.Ingredients.Name

			@ingredientId int
		
as
/*
Declare 
			@ingredientId int = 28
				
Execute [dbo].[MenuItems_Select_ByIngredientId] @ingredientId
	
Select *
from dbo.MenuItems
Select *
from dbo.MenuItemIngredients
Select *
from dbo.Ingredients
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
									Where mi.Id = mii.MenuItemId
								For JSON AUTO
								)
				,FoodSafeTypes = ( Select *
									From dbo.FoodSafeTypes as fst inner join dbo.DietaryRestrictions as dr
											on  fst.Id = dr.FoodSafeTypeId
										inner join dbo.MenuItems as mi
											on mi.Id = dr.MenuItemId
									Where mi.Id = dr.MenuItemId
								For JSON AUTO
								)
		  FROM dbo.MenuItems as mi inner join dbo.Organizations as o
					on mi.OrderStatusId = o.Id
				inner join dbo.StatusTypes as st
					on mi.OrderStatusId = st.Id
				inner join dbo.MenuItemIngredients as mii
					on mii.MenuItemId = mi.Id
				inner join dbo.Ingredients as i
					on i.Id = mii.IngredientId

		Where i.Id = @ingredientId 
		
		ORDER BY mi.Id
	
END


GO
