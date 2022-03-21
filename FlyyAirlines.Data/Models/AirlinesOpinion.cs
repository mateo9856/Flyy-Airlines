using FlyyAirlines.Data.Enums;
using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Data.Models
{
    public class AirlinesOpinion : BaseEntity
    {
        public User CommentUser { get; set; }
        public OpinionStars Stars { get; set; }
        public string Content { get; set; }
    }
}
