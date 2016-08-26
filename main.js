
var CreepManager = require('CreepManager');

module.exports.loop = function ()
{

   //Clean nonexistant creeps from memory
   for(var name in Memory.creeps)
   {
      if(!Game.creeps[name])
      {
         delete Memory.creeps[name];
         console.log('Clearing non-existing creep memory:', name);
      }
   }

   //Manage all creeps in all rooms
   for(var room_itr in Game.rooms)
   {
      var room = Game.rooms[room_itr];

      var creepManager = new CreepManager(room);
      creepManager.tick();
   }

}
