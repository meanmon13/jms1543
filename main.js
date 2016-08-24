var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var CreepFactory = require('CreepFactory');


//creepPlan[spawn level][roleNum] = number of expected creeps for a given role
var creepPlan =
[
    //# Harvesters, # Upgraders, # Builders
    [0,0,0], //Controller Level 0
    [2,2,0], //Controller Level 1
    [3,3,1]  //Controller Level 2
];

module.exports.loop = function ()
{
   var spawn = Game.spawns['Spawn1'];
   var room = spawn.room;
   var factory = new CreepFactory(spawn);

   for(var name in Memory.creeps)
   {
      if(!Game.creeps[name])
      {
         delete Memory.creeps[name];
         console.log('Clearing non-existing creep memory:', name);
      }
   }

   var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
   var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
   var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

   console.log('Harvesters: ' + harvesters.length);
   console.log('Upgraders: ' + upgraders.length);
   console.log('Builders: ' + builders.length);


   if(harvesters.length < creepPlan[room.controller.level][0])
   {
      factory.spawnHarvester(undefined);
   }
   else if(upgraders.length < creepPlan[room.controller.level][1])
   {
      factory.spawnUpgrader(undefined);
   }
   else if(builders.length < creepPlan[room.controller.level][2])
   {
      factory.spawnBuilder(undefined);
   }

   for(var name in Game.creeps)
   {
      var creep = Game.creeps[name];
      if(creep.memory.role == 'harvester')
      {
         roleHarvester.run(creep);
      }
      else if(creep.memory.role == 'upgrader')
      {
         roleUpgrader.run(creep);
      }
      else if(creep.memory.role == 'builder')
      {
         roleBuilder.run(creep);
      }
   }
}
