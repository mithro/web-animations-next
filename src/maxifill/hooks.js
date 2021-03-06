// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.
(function(scope) {
  scope.hookSetter = function(proto, property, setter) {
    var original = Object.getOwnPropertyDescriptor(proto, property);
    Object.defineProperty(proto, property, {
      enumerable: true,
      configurable: true,
      get: original.get,
      set: function(v) {
        original.set.call(this, v);
        setter.call(this, v);
      }
    });
  };

  scope.hookMethod = function(proto, property, f) {
    var original = proto[property];
    proto[property] = function() {
      var result = original.call(this);
      f.call(this);
      return result;
    };
  };
})(webAnimationsMaxifill);
