var roleUpgrader = require('role.upgrader');

var roleIdler =
{

   /** @param {Creep} creep 
      This function returns false if the creep has full energy but no structures require refueling; otherwise, true is returned.
   **/
   run: function(creep,spawn)
	{
      //Set the idle position to be just off from Spawn
      //var idleX = spawn.pos.x+5;
      //var idleY = spawn.pos.y+5;
      //creep.moveTo(idleX,idleY); 

      //Instead of just sitting by idle... put time into upgrading 
      roleUpgrader.run(creep);
   }
};

module.exports = roleIdler;
