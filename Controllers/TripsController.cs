using Microsoft.AspNetCore.Mvc;
using react_aspnetcore_tut.Data;

namespace react_aspnetcore_tut.Controllers
{
    [Route("api/trips")]
    public class TripsController : Controller
    {
        private ITripService _service;

        public TripsController(ITripService service)
        {
            this._service = service;            
        }

        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody]Trip trip)
        {
            if (trip != null)
            {
                _service.AddTrip(trip);
            }
            return Ok();
        }
    }
}