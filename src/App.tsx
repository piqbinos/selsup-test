import { Component } from 'react';

const params = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const paramValues = [
  { paramId: 1, value: 'повседневное' },
  { paramId: 2, value: 'макси' },
];

const model = {
  paramValues,
};

interface Param<T> {
  id: number;
  name: string;
  type: T;
}

interface ParamValue {
  paramId: number;
  value: Param<typeof params[number]['type']>['type'];
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param<typeof params[number]['type']>[];
  model: Model;
}

interface State {
  model: Model;
  showData: boolean;
}

class DataView extends Component<{ data: Model }> {
  render() {
    return (
      <div>
        {this.props.data.paramValues.map((paramValue) => (
          <ul key={paramValue.paramId}>
            <li>
              {paramValue.paramId}: {paramValue.value}
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      model: this.props.model,
      showData: false,
    };
  }

  public getModel = () => {
    return this.state.model;
  };

  public changeParamValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = Number(event.currentTarget.id);
    const value = event.currentTarget.value;
    this.setState((prevState: State) => {
      const model = prevState.model;
      model.paramValues.map((paramValue) => {
        if (paramValue.paramId === id) {
          paramValue.value = value;
        }
        return paramValue;
      });

      return { model };
    });
  };

  public showDataHandler = () => {
    this.setState((prevState: State) => ({
      showData: !prevState.showData,
    }));
  };

  render() {
    const data = this.getModel();

    return (
      <>
        <form
          style={{
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
          onSubmit={(event) => event.preventDefault()}
        >
          {this.props.params.map((param: { id: number; name: string }) => (
            <div
              key={param.id}
              style={{
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: '1fr 3fr',
                gap: '20px',
              }}
            >
              <label htmlFor={`${param.id}`}>{param.name}</label>
              <input
                id={`${param.id}`}
                type="text"
                onChange={this.changeParamValueHandler}
                value={
                  this.state.model.paramValues.find(
                    (paramValue) => paramValue.paramId === param.id
                  )?.value
                }
              />
            </div>
          ))}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={this.showDataHandler}
          >
            Get Model
          </button>
        </form>
        {this.state.showData && <DataView data={data} />}
      </>
    );
  }
}

class App extends Component {
  render() {
    return <ParamEditor params={params} model={model} />;
  }
}

export { App };
