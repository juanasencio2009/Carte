using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Sabio.Models.Requests.MenuItems
{
    public class MenuItemUpdateAllRequest : MenuItemAddAllRequest
    {
        [Required(ErrorMessage = "Id is required")]
        [Range(1, Int32.MaxValue)]
        public int MenuItemId { get; set; } 

    }
}
