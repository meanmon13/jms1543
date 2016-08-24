
var CreepFactory = function(spawn)
{
   this.room = spawn.room;
   this.spawn = spawn;
}
//-----------------------------------------------------------------------------

CreepFactory.prototype.spawnHarvester = function(name)
{
   var result = this.spawnNewCreep([WORK,CARRY,MOVE], name, 'harvester');
   return (result == OK);
}
//-----------------------------------------------------------------------------

CreepFactory.prototype.spawnUpgrader = function(name)
{
   var result = this.spawnNewCreep([WORK,CARRY,MOVE], name, 'upgrader');
   return (result == OK);
}
//-----------------------------------------------------------------------------

CreepFactory.prototype.spawnBuilder = function(name)
{
   var result = this.spawnNewCreep([WORK,CARRY,MOVE], name, 'builder');
   return (result == OK);
}
//-----------------------------------------------------------------------------

//The main spawn logic
//This function returns 'ERR_BUSY' if the spawner is busy, 'OK' if the spawn was a success
//and the error code if an error occured.
CreepFactory.prototype.spawnNewCreep = function(body,name,roleName)
{
      //First check to see if the creep is already being spawned
      if(this.spawn.spawning != undefined)
      {
         if(this.spawn.spawning.name != name)
         {
              console.log('CreepFactory::spawnNewCreep() WARNING: unable to spawn creep with name ' + name + ' a creap with name ' + this.spawn.spawning.name + 'is currently being spawned!');
              return ERR_BUSY;
         }

         //The creep is currently being spawned so return true
         return OK;
      }

      var result = this.spawn.createCreep(body, name, {role: roleName});
     if(!_.isString(result))
     {
        console.log('CreepMaster::spawnNewCreep() ERROR: failed to spawn a creep with name ' + name + ' and role ' + roleName + ' with result: ' + result );
        return result;
     }

     return OK;
}
//-----------------------------------------------------------------------------

module.exports = CreepFactory;
