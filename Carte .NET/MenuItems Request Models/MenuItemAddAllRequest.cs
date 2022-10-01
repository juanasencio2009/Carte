using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.MenuItems
{
    public class MenuItemAddAllRequest:MenuItemAddRequest
    {
        [Required(ErrorMessage = "ModifiedBy is required")]
        [Range(1, Int32.MaxValue)]
        public int ModifiedBy { get; set; }

        [Required(ErrorMessage = "FoodSafeTypeId is required")]
        [Range(1, Int32.MaxValue)]
        public int FoodSafeTypeId { get; set; }

        [Required(ErrorMessage = "TagId is required")]
        [Range(1, Int32.MaxValue)]
        public int TagId { get; set; }

        [Required(ErrorMessage = "CreatedBy is required")]
        [Range(1, Int32.MaxValue)]
        public int CreatedBy { get; set; }

        [Required(ErrorMessage = "IngredientId is required")]
        [Range(1, Int32.MaxValue)]
        public int IngredientId { get; set; }
    }
}
