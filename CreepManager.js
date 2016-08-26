
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

var CreepManager = function(room)
{
    this.room = room;
    this.spawn = Game.spawns['Spawn1'];  //spawns['Spawn1'];
    
    this.creepFactory = new CreepFactory(this.spawn);

    this.numCreeps = 0;

    this.creepCounts = [0,0,0];
}
//-----------------------------------------------------------------------------

CreepManager.prototype.tick = function()
{

   var myCreeps = this.room.find(FIND_MY_CREEPS);

   for(var name in myCreeps)
   {

      var creep = myCreeps[name];
      if(creep.memory.role == 'harvester')
      {
         roleHarvester.run(creep);
         this.creepCounts[0]++;
      }
      else if(creep.memory.role == 'upgrader')
      {
         roleUpgrader.run(creep);
         this.creepCounts[1]++;
      }
      else if(creep.memory.role == 'builder')
      {
         roleBuilder.run(creep);
         this.creepCounts[2]++;
      }
   }

   if(this.creepCounts[0] < creepPlan[this.room.controller.level][0])
   {
      this.creepFactory.spawnHarvester(undefined);
   }
   else if(this.creepCounts[1] < creepPlan[this.room.controller.level][1])
   {
      this.creepFactory.spawnUpgrader(undefined);
   }
   else if(this.creepCounts[2] < creepPlan[this.room.controller.level][2])
   {
      this.creepFactory.spawnBuilder(undefined);
   }

   console.log('Harvesters: ' + this.creepCounts[0]);
   console.log('Upgraders: ' + this.creepCounts[1]);
   console.log('Builders: ' + this.creepCounts[2]);

}
//-----------------------------------------------------------------------------

module.exports = CreepManager;
