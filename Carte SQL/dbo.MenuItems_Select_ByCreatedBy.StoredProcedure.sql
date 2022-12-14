USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Select_ByCreatedBy]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 29Aug2022
-- Description:	A proc to select by CreatedBy column.
-- Code Reviewer: Ryu Matsu


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Select_ByCreatedBy]
--Select MenuItems by CreatedBy where IsDeleted = 0(false)
--Paginated

			@createdBy int 
			,@pageIndex int 
            ,@pageSize int

as
/*
Declare
			@createdBy int  = 1
			,@pageIndex int  = 0
            ,@pageSize int = 10


Execute [dbo].[MenuItems_Select_ByCreatedBy] @createdBy
											,@pageIndex  
											,@pageSize 


Select *
from dbo.MenuItems
Select *
from dbo.Organizations
Select *
from dbo.StatusTypes
Select *
from dbo.Ingredients
Select *
from dbo.MenuItemIngredients
*/
BEGIN

   Declare @offset int = @pageIndex * @pageSize

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
		
	Where mi.CreatedBy = @createdBy AND mi.IsDeleted = 0

	ORDER BY mi.Id 
		OFFSET @offSet Rows
	Fetch Next @pageSize Rows ONLY

END


GO
