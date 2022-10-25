class Level
{
    constructor(inputCount, outputCount)
    {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weigts = [];
        for(let i = 0; i < inputCount; i++)
        {
            this.weigts[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level)
    {
        for(i = 0; i < level.inputs.length; i++)
        {
            for(j = 0; j < level.outputs.length; j++)
            {
                level.weigts[i][j] = Math.random() * 2 - 1;//this way values are between -1 and 1;
            }
        }

        for(let i = 0; i < level.biases.length; i++)
        {
            level.biases[i] = Math.random() * 2 -1;
        }
    }

    static feedForward(givenInputs, level)
    {
        for(let i = 0; i < level.inputs.length; i++)
        {
            level.inputs[i] = givenInputs[i];
        }

        for(let i = 0; i < level.outputs.length; i++)
        {
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++)
            {
                if(sum > level.biases[i])
                {
                    level.outputs[i] = 1;
                }
                else 
                {
                    level.outputs[i] = 0;
                }
            }

        }

        return level.outputs;
    }
}
