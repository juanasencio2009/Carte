using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class MenuItemAddRequest 
    {

        [Required(ErrorMessage = "OrganizationId is required")]
        [Range(1, Int32.MaxValue)]
        public int OrganizationId { get; set; }

        [Required(ErrorMessage = "OrderStatusId is required")]
        [Range(1, Int32.MaxValue)]
        public int OrderStatusId { get; set; }

        [Required(ErrorMessage = "UnitCost is required")]
        public decimal UnitCost { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [MaxLength(255)]
        public string ImageUrl { get; set; }

       
    }
}
