using Sabio.Models.Ingredients;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.MenuItems
{
    public class MenuItem 
    {
        public int Id { get; set; }
        public OrganizationBase Organization { get; set; } 
        public LookUp  OrderStatus { get; set; }
        public decimal UnitCost { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPublic { get; set; }
        public List<LookUp> Tags { get; set; }
        public List<Ingredient> MenuIngredients { get; set; }
        public List<LookUp> MenuFoodSafeType { get; set; }


    }
}
