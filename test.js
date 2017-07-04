var klass = (function() {
    var F = function() {};

    return function(Parent) {
        var Child;

        Child = function() {
            Child.superproto.constructor.apply(this, arguments);
        };

        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superproto = Parent.prototype;

        return Child;
    };
})();

var Character = function() {
        this.name = "";
        this.role = "";
        this.levelExp = 100;
        this.curExp = 0;
        this.level = 1;
    },
    Warrior = klass(Character),
    Mage = klass(Character),
    Archer = klass(Character),

    Player = function() {};

Character.prototype.updatelevel = function(exp) {
    this.curExp += exp;
    if (this.curExp >= this.levelExp) {
        this.curExp -= this.levelExp;
        this.level++;
        this.levelExp -= this.level * 100;
        console.log("升级了！当前等级：" + this.level);
    }
}
Character.prototype.fight = function() {
    let exp = parseInt(Math.random() * this.levelExp / 10);
    console.log("打了一下，获得了" + exp);
    this.updatelevel(exp);
}

CharacterFactory = (function() {
    var roles = {
        Warrior: Warrior,
        Mage: Mage,
        Archer: Archer
    };
    return {
        createCharacter: function(role) {
            var Character = roles[role];
            return Character ? new Character() : new Warrior();
        },
        registerCharacter: function(role, Character) {
            var proto = Character.prototype;
            if (proto.level && proto.gather && proto.fight) {
                roles[role] = Character;
            }
        }
    }
})();

Player.prototype.play = function(role) {
    var character = CharacterFactory.createCharacter(role);
    character.updatelevel();
    character.fight();
};

var Assasin = klass(Character);
CharacterFactory.registerCharacter("Assasin", Assasin);

var player = new Player();
player.play("Assasin");