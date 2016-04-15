var Taf = Taf || {};

/**
 * WUP使用类
 *
 */
Taf.Wup = function() {
    this.iVersion = 3;
    this.cPacketType = 0;
    this.iMessageType = 0;
    this.iRequestId = 0;
    this.sServantName = '';
    this.sFuncName = '';
    this.sBuffer = new Taf.BinBuffer();
    this.iTimeout = 0;
    this.context = new Taf.Map(new Taf.STRING(), new Taf.STRING());
    this.status = new Taf.Map(new Taf.STRING(), new Taf.STRING());
    this.data = new Taf.Map(new Taf.STRING(), new Taf.Map(new Taf.STRING(), new Taf.BinBuffer()));
    this.newdata = new Taf.Map(new Taf.STRING(), new Taf.BinBuffer());
};


Taf.Wup.prototype.setVersion = function(value) {
    this.iVersion = value;
}

Taf.Wup.prototype.getVersion = function(value) {
    return this.iVersion;
}


Taf.Wup.prototype.setServant = function(value) {
    this.sServantName = value;
};

Taf.Wup.prototype.setFunc = function(value) {
    this.sFuncName = value;
};


Taf.Wup.prototype.setRequestId = function(value) {
    this.iRequestId = value ? value : (++this.iRequestid);
};

Taf.Wup.prototype.getRequestId = function() {
    return this.iRequestId;
};


Taf.Wup.prototype.setTimeOut = function(value) {
    this.iTimeout = value;
};

Taf.Wup.prototype.getTimeOut = function() {
    return this.iTimeout;
};





Taf.Wup.prototype.writeTo = function() {
    // body...
    var os = new Taf.JceOutputStream();
    os.writeInt16(1, this.iVersion);
    os.writeInt8(2, this.cPacketType);
    os.writeInt32(3, this.iMessageType);
    os.writeInt32(4, this.iRequestId);
    os.writeString(5, this.sServantName);
    os.writeString(6, this.sFuncName);
    os.writeBytes(7, this.sBuffer);
    os.writeInt32(8, this.iTimeout);
    os.writeMap(9, this.context);
    os.writeMap(10, this.status);
    return new Taf.BinBuffer(os.getBuffer());
};


Taf.Wup.prototype.encode = function() {
    var os = new Taf.JceOutputStream();
    if (this.iVersion == 3) {
        os.writeMap(0, this.newdata);
    } else {
        os.writeMap(0, this.data);
    }
    this.sBuffer = os.getBinBuffer();

    var temp = new Taf.BinBuffer();
    temp = this.writeTo();

    var buf = new Taf.BinBuffer();
    buf.writeInt32(4 + temp.len);
    buf.writeBytes(temp);
    return buf;
}


Taf.Wup.prototype.writeBoolean = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeBoolean(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.BOOLEAN;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Taf.BinBuffer(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt8 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt8(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.CHAR;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Taf.BinBuffer(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt16 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt16(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.SHORT;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt32 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt32(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.INT32;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt64 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt64(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.INT64;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeFloat = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeFloat(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.FLOAT;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeDouble = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeDouble(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.DOUBLE;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeString = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeString(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = Taf.TypeHelp.STRING;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeVector = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeVector(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBinBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = value._className();
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeStruct = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeStruct(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        //todo  
        var classType = " ";
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeBytes = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeBytes(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = "vec";
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeMap = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeMap(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = Taf.Util.getClassType(value);
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.readFrom = function(is) {
    this.iVersion = is.readInt16(1, true);
    this.cPacketType = is.readInt8(2, true);
    this.iMessageType = is.readInt32(3, true);
    this.iRequestId = is.readInt32(4, true);
    this.sServantName = is.readString(5, true);
    this.sFuncName = is.readString(6, true);
    this.sBuffer = is.readBytes(7, true);
    this.iTimeout = is.readInt32(8, true);
    this.context = is.readMap(9, true);
    this.status = is.readMap(10, true);
}



Taf.Wup.prototype.decode = function(buf) {
    var is = new Taf.JceInputStream(buf);
    var len = is.buf.vew.getInt32(is.buf.position);
    if (len < 4) {
        throw Error("packet length too short");
    }
    // is.buf.length = len;
    is.buf.position += 4;
    this.readFrom(is);
    is = new Taf.JceInputStream(this.sBuffer.getBuffer());
    if (this.iVersion == 3) {
        this.newdata.clear();
        is.readMap(0, true, this.newdata);
    } else {
        this.data.clear();
        is.readMap(0, true, this.newdata);
    }
}


Taf.Wup.prototype.readBoolean = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readBoolean(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.BOOLEAN;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readBoolean(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readInt8 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt8(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.CHAR;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readInt8(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readInt16 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt16(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.SHORT;
        var newNode = temp.get(className);
        var is = new Taf.JceInputStream(newNode);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        def = is.readInt16(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readInt32 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt32(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.INT32;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readInt32(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readInt64 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt64(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.INT64;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readInt64(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readFloat = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readFloat(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.FLOAT;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readFloat(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readDouble = function(name) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readDouble(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.DOUBLE;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readDouble(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readVector = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readVector(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readVector(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readStruct = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readStruct(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readStruct(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readMap = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readMap(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readMap(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readBytes = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readBytes(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readBytes(0, true, def);
    }
    return def;
}
