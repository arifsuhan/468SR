


function Pad(mode, pads ,tensor)
{
    return tensor.pad([0,0,0,0,1,1,1,1], mode);
}


function Conv(dilations = [1, 1], group = 1, kernel_shape = [3, 3], pads = [0, 0, 0, 0], strides = [1, 1],tensor , weight, bias )
{   
    return conv4dTensor(tensor, kernel_shape, pads, strides , weight, bias);
}

function Relu(tensor)
{   
    //console.log(tensor.shape());
    tensor.iterator(function(x) 
    {
        return ((x < 0) ? 0 : x);
    });

    return tensor;
}

function Concat(axis = 1,tensor1, tensor2)
{   

    tensor1.array.concat(tensor2.array);

    return tensor1;
}

function Constant(value = tensor)
{   

    return value;
}

function Mul(tensor1, tensor2)
{    
    //console.log(tensor1.array[0][0][0][0]);
    //console.log(tensor1.shape());
    //console.log(tensor2.shape());
    //return tensor1.mul(tensor2);
    return tensor1;

}

function Add(tensor1, tensor2)
{   
    // console.log(tensor1.shape());
    // console.log(tensor2.shape());

    //return addTensor(tensor1.array,tensor2.array);
    //return tensor1.add(tensor2);
    //return new Tensor(tensor1);
    return tensor1;
}

function Reshape(tensor1, tensor2)
{   
    tensor1.reshape(tensor2.shape());

    return tensor1;
}

function Transpose(perm = [0, 1, 4, 2, 5, 3],tensor)
{   
    return tensor.transpose();
}

