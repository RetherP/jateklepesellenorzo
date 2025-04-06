using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class GameApiController
    {
        [HttpGet("{moves}")]
        public Game ValidateMoves([FromBody] Game g, string moves)
        {
            Game res = new Game();
            Tuple<int, int> currentLoc = CurrentLocation(g);
            if(currentLoc.Item1 != -1 && currentLoc.Item2 != -1)
            {
                //some logic here
            }
            return res;
        }
        public Tuple<int,int> CurrentLocation(Game g)
        {
            Tuple<int, int> res = new Tuple<int, int>(-1,-1);
            for (int i = 0; i < g.CurrentState.GetLength(0); i++)
            {
                for (int j = 0; j < g.CurrentState.GetLength(1); j++)
                {
                    if (g.CurrentState[i,j] == '█')
                    {
                        return (new Tuple<int, int>(i, j));
                    }
                }
            }
            return res;
        }
    }
}
