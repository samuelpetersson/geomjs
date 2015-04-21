# geomjs
Contains geometry utilities and computations.

## Concept

```javascript

```

### 1. Point

### 2. Build

### 3. Transform


## Content

### Mat3
```javascript
```

### Mat4
```javascript
var view = new geom.Mat4();
view.scale(2, 2, 2);

var camera = new geom.Mat4();
camera.translate(10, 0, -10);
camera.lockAt(0, 0, 5);
camera.invert();

var projection = new geom.Mat4();
projection.perspective(60, 16/9, 1, 2000);
projection.concat(camera);
projection.concat(view);

projection.project(input, output);
```

### Solid
Conforms to pointer.

```javascript
var model1 = new geom.Solid(vertices, geom.mat4);
model1.data = [x,y,z, ...];
model1 = model1.union(that);
model1 = model1.subtract(that);
model1 = model1.intersection(that);

mat.transform(model1);

var info = {};
if(model1.intersects(that, info)) {
    info.normal;
}

```

### Mesh
```javascript

var model = new geom.Mesh(strategy);
//Required
model.vertexData//Float32Array
model.vertices//pointer
//Optional (Based on configuration)
model.indexData//Uint8Array
model.indices//pointer
model.normals//pointer
model.texture//pointer
model.color//pointer
```


### Mesh~Normals
Compute flat or smooth normals

```javascript
var solid = geom.createSphere();
var model = solid.ceateMesh();
model.smoothNormals();
//or
model.flatNormals();
```


