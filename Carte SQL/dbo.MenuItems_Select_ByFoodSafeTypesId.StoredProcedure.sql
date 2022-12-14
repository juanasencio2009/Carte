USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Select_ByFoodSafeTypesId]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 30Aug2022
-- Description:	A proc to Select MenuItem by OrganizationId.
-- Code Reviewer: Ryu Matsu


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Select_ByFoodSafeTypesId]
--Joins MenuItems, DietaryRestrictions, FoodSafeTypes

			@foodSafeTypeId int
		
as
/*
Declare 
			@foodSafeTypeId int = 5
				
Execute [dbo].[MenuItems_Select_ByFoodSafeTypesId] @foodSafeTypeId
	
Select *
from dbo.MenuItems
Select *
from dbo.DietaryRestrictions
Select *
from dbo.FoodSafeTypes
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
		  , TotalCount = COUNT(1) OVER() 
		  FROM dbo.MenuItems as mi 
			inner join dbo.Organizations as o
					on mi.OrderStatusId = o.Id
			inner join dbo.StatusTypes as st
					on mi.OrderStatusId = st.Id
			inner join dbo.Users as u
					on mi.CreatedBy = u.Id 
			inner join dbo.Users as u1 
					on mi.ModifiedBy = u1.Id
			inner join dbo.DietaryRestrictions as dr
				on dr.MenuItemId = mi.Id
			inner join dbo.FoodSafeTypes as fst 
				on fst.Id = dr.FoodSafeTypeId

		Where fst.Id = @foodSafeTypeId 
		
		ORDER BY mi.Id

END


GO
