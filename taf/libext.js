var Taf = Taf || {};
Taf.INT8 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt8(tag, val); }
	this._read 	= function(is, tag, def) { return is.readInt8(tag, true, def); }
	this._className = function(){ return Taf.CHAR; }
};
Taf.INT16 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt16(tag, val); }
	this._read 	= function(is, tag, def) { return is.readInt16(tag, true, def); }
	this._className = function(){ return Taf.SHORT; }
};
Taf.INT32 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt32(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt32(tag, true, def); }
	this._className = function(){ return Taf.INT32; }
};
Taf.INT64 = function()
{
	this._clone = function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt64(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt64(tag, true, def); }
	this._className = function(){ return Taf.INT64; }
};
Taf.UINT8 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt16(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt16(tag, true, def); }
	this._className = function(){ return Taf.SHORT; }
};
Taf.UInt16 = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeInt32(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt32(tag, true, def); }
	this._className = function(){ return Taf.INT32; }
};
Taf.UInt32 = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeInt64(tag, val); }
	this._read  = function(is, tag, def) { return is.readInt64(tag, true, def); }
	this._className = function(){ return Taf.INT64; }
};
Taf.Float = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeFloat(tag, val); }
	this._read  = function(is, tag, def) { return is.readFloat(tag, true, def); }
	this._className = function(){ return Taf.FLOAT; }
};
Taf.Double = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeDouble(tag, val); }
	this._read  = function(is, tag, def) { return is.readDouble(tag, true, def); }
	this._className = function(){ return Taf.DOUBLE; }
};
Taf.STRING = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeString(tag, val); }
	this._read	= function(is, tag, def) { return is.readString(tag, true, def); }
	this._className = function(){ return Taf.STRING; }
};
Taf.BOOLEAN	= function()
{
	this._clone	= function() { return false; }
	this._write	= function(os, tag, val) { return os.writeBoolean(tag, val); }
	this._read	= function(is, tag, def) { return is.readBoolean(tag, true, def); }
	this._className = function(){ return Taf.BOOLEAN; }
};
Taf.ENUM	= function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt32(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt32(tag, true, def); }
};

/**
 * TAFVECTOR实现类
 */
Taf.Vector	= function(proto)
{
	this.proto = proto;
	this.val   = new Array();
}
Taf.Vector.prototype._clone = function() { return new Taf.Vector(this.proto); }
Taf.Vector.prototype._write	= function(os, tag, val) { return os.writeVector(tag, val); }
Taf.Vector.prototype._read  = function(is, tag, def) { return is.readVector(tag, true, def); }
Taf.Vector.prototype._className = function() {
	return Taf.TypeHelp.VECTOR.replace("$t",this.proto._className() );
}

/**
 * TAFMAP实现类
 */
Taf.Map	= function(kproto, vproto) 
{
	this.kproto = kproto;
	this.vproto = vproto;
	this.val 	= new Object();
};
Taf.Map.prototype._clone = function () { return new Taf.Map(this.kproto, this.vproto); }
Taf.Map.prototype._write = function (os, tag, val) { return os.writeMap(tag, val); }
Taf.Map.prototype._read	 = function (is, tag, def) { return is.readMap(tag, true, def); }

Taf.Map.prototype.put    = function(key, value) { this.val[key] = value; }
Taf.Map.prototype.get    = function(key) { return this.val[key]; }
Taf.Map.prototype.remove = function(key) { delete this.val[key]; }
Taf.Map.prototype.clear  = function()    { this.val = new Object(); }
Taf.Map.prototype.size   = function() 
{
	var anum = 0;
	for (var key in this.val) {anum++;}
	return anum;
};

Taf.Vector.prototype._className = function() {
	return Taf.TypeHelp.Map.replace("$k",this.kproto._className() ).replace("$v", this.vproto._className() );
}
