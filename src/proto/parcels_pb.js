// source: src/proto/parcels.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Parcels', null, global);
goog.exportSymbol('proto.Parcels.Parcel', null, global);
goog.exportSymbol('proto.Parcels.Parcel.LatLon', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Parcels = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Parcels.repeatedFields_, null);
};
goog.inherits(proto.Parcels, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Parcels.displayName = 'proto.Parcels';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Parcels.Parcel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Parcels.Parcel.repeatedFields_, null);
};
goog.inherits(proto.Parcels.Parcel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Parcels.Parcel.displayName = 'proto.Parcels.Parcel';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Parcels.Parcel.LatLon = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Parcels.Parcel.LatLon, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Parcels.Parcel.LatLon.displayName = 'proto.Parcels.Parcel.LatLon';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Parcels.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Parcels.prototype.toObject = function(opt_includeInstance) {
  return proto.Parcels.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Parcels} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parcels.toObject = function(includeInstance, msg) {
  var f, obj = {
    parcelsList: jspb.Message.toObjectList(msg.getParcelsList(),
    proto.Parcels.Parcel.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Parcels}
 */
proto.Parcels.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Parcels;
  return proto.Parcels.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Parcels} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Parcels}
 */
proto.Parcels.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Parcels.Parcel;
      reader.readMessage(value,proto.Parcels.Parcel.deserializeBinaryFromReader);
      msg.addParcels(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Parcels.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Parcels.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Parcels} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parcels.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getParcelsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Parcels.Parcel.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Parcels.Parcel.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Parcels.Parcel.prototype.toObject = function(opt_includeInstance) {
  return proto.Parcels.Parcel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Parcels.Parcel} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parcels.Parcel.toObject = function(includeInstance, msg) {
  var f, obj = {
    pointsList: jspb.Message.toObjectList(msg.getPointsList(),
    proto.Parcels.Parcel.LatLon.toObject, includeInstance),
    classificationsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Parcels.Parcel}
 */
proto.Parcels.Parcel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Parcels.Parcel;
  return proto.Parcels.Parcel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Parcels.Parcel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Parcels.Parcel}
 */
proto.Parcels.Parcel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Parcels.Parcel.LatLon;
      reader.readMessage(value,proto.Parcels.Parcel.LatLon.deserializeBinaryFromReader);
      msg.addPoints(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addClassifications(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Parcels.Parcel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Parcels.Parcel.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Parcels.Parcel} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parcels.Parcel.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPointsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Parcels.Parcel.LatLon.serializeBinaryToWriter
    );
  }
  f = message.getClassificationsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Parcels.Parcel.LatLon.prototype.toObject = function(opt_includeInstance) {
  return proto.Parcels.Parcel.LatLon.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Parcels.Parcel.LatLon} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parcels.Parcel.LatLon.toObject = function(includeInstance, msg) {
  var f, obj = {
    latitude: (f = jspb.Message.getOptionalFloatingPointField(msg, 1)) == null ? undefined : f,
    longitude: (f = jspb.Message.getOptionalFloatingPointField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Parcels.Parcel.LatLon}
 */
proto.Parcels.Parcel.LatLon.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Parcels.Parcel.LatLon;
  return proto.Parcels.Parcel.LatLon.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Parcels.Parcel.LatLon} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Parcels.Parcel.LatLon}
 */
proto.Parcels.Parcel.LatLon.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLatitude(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLongitude(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Parcels.Parcel.LatLon.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Parcels.Parcel.LatLon.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Parcels.Parcel.LatLon} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Parcels.Parcel.LatLon.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * required float latitude = 1;
 * @return {number}
 */
proto.Parcels.Parcel.LatLon.prototype.getLatitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Parcels.Parcel.LatLon} returns this
 */
proto.Parcels.Parcel.LatLon.prototype.setLatitude = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Parcels.Parcel.LatLon} returns this
 */
proto.Parcels.Parcel.LatLon.prototype.clearLatitude = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Parcels.Parcel.LatLon.prototype.hasLatitude = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required float longitude = 2;
 * @return {number}
 */
proto.Parcels.Parcel.LatLon.prototype.getLongitude = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Parcels.Parcel.LatLon} returns this
 */
proto.Parcels.Parcel.LatLon.prototype.setLongitude = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Parcels.Parcel.LatLon} returns this
 */
proto.Parcels.Parcel.LatLon.prototype.clearLongitude = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Parcels.Parcel.LatLon.prototype.hasLongitude = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated LatLon points = 1;
 * @return {!Array<!proto.Parcels.Parcel.LatLon>}
 */
proto.Parcels.Parcel.prototype.getPointsList = function() {
  return /** @type{!Array<!proto.Parcels.Parcel.LatLon>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Parcels.Parcel.LatLon, 1));
};


/**
 * @param {!Array<!proto.Parcels.Parcel.LatLon>} value
 * @return {!proto.Parcels.Parcel} returns this
*/
proto.Parcels.Parcel.prototype.setPointsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Parcels.Parcel.LatLon=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Parcels.Parcel.LatLon}
 */
proto.Parcels.Parcel.prototype.addPoints = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Parcels.Parcel.LatLon, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Parcels.Parcel} returns this
 */
proto.Parcels.Parcel.prototype.clearPointsList = function() {
  return this.setPointsList([]);
};


/**
 * repeated string classifications = 2;
 * @return {!Array<string>}
 */
proto.Parcels.Parcel.prototype.getClassificationsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.Parcels.Parcel} returns this
 */
proto.Parcels.Parcel.prototype.setClassificationsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.Parcels.Parcel} returns this
 */
proto.Parcels.Parcel.prototype.addClassifications = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Parcels.Parcel} returns this
 */
proto.Parcels.Parcel.prototype.clearClassificationsList = function() {
  return this.setClassificationsList([]);
};


/**
 * repeated Parcel parcels = 1;
 * @return {!Array<!proto.Parcels.Parcel>}
 */
proto.Parcels.prototype.getParcelsList = function() {
  return /** @type{!Array<!proto.Parcels.Parcel>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Parcels.Parcel, 1));
};


/**
 * @param {!Array<!proto.Parcels.Parcel>} value
 * @return {!proto.Parcels} returns this
*/
proto.Parcels.prototype.setParcelsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Parcels.Parcel=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Parcels.Parcel}
 */
proto.Parcels.prototype.addParcels = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Parcels.Parcel, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Parcels} returns this
 */
proto.Parcels.prototype.clearParcelsList = function() {
  return this.setParcelsList([]);
};


goog.object.extend(exports, proto);
