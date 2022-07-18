import { useContext } from 'react';
import { useEffect, useState } from 'react';
import ScooterContext from './ScooterContext';

function Edit () {

    const { modalData, setModalData, setEditData, colors } = useContext(ScooterContext);

    const [lastTimeUsed, setLastTimeUsed] = useState('');
    const [isBusy, setIsBusy] = useState(0);
    const [totalRideKilometres, setTotalRideKilometres] = useState(0);
    const [color, setColor] = useState('0');

    useEffect(() => {
        if (null === modalData) {
          return;
        }
        console.log(modalData);
        setIsBusy(modalData.isBusy);
        setLastTimeUsed(modalData.lastTimeUsed);
        setColor(colors.filter(c => modalData.color === c.color)[0]?.id ?? 0); //pradinė spalva iš modalo atsidarius 'Edit'; imamas obj, bet nerandamas ir priskiriamas null, kai obj? => kai obj nerandamas priskiriamas undefined;
      }, [modalData]);
      

    const handleEdit = () => {
        const data = {
            id: modalData.id, 
            regCode: modalData.regCode, 
            isBusy,
            lastTimeUsed, 
            totalRideKilometres: Number(modalData.totalRideKilometres) + Number(totalRideKilometres),
            color
        };
        setEditData(data);
        setTotalRideKilometres(0);
        setModalData(null);
    }
    if (modalData === null) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h3>Modal title</h3>
                    <button className="close" type="button" onClick={() => setModalData(null)}>
                    <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
                <div className="modal-body"></div>
                    <div className='form-group'>
                        <small>ID number:</small>
                        <p>{modalData.id}</p>

                        <small>Registration code:</small>
                        <p>{modalData.regCode}</p>

                        <small>Last use time: </small>
                        <p>{modalData.lastTimeUsed}</p>

                        <small>New date: </small>
                        <input className='input-1' type='date' value={lastTimeUsed} onChange={e => setLastTimeUsed(e.target.value)}/>

                        <small>Total km: </small>
                        <p>{modalData.totalRideKilometres}</p>
                        
                        <small>Ride distance km: </small>
                        <input className='input-1' type='number' value={totalRideKilometres} onChange={e => setTotalRideKilometres(e.target.value)}/>

                        <small>Is Busy: </small>
                        <input className='checkbox' type='checkbox' checked={isBusy} onChange={() => setIsBusy(isBusy ? 0 : 1)}/>
                    </div>
                    <div className="form-group">
                        <label className="label">Select color</label>
                        <select className="input-1"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}>
                        <option value='0'>Select color</option>
                        {
                            colors ? colors.map(element => <option key={element.id} value={element.id}>{element.color}</option>) : null
                        }
                        </select>
                     </div>
                </div>
                <div className="modal-footer">
                    <button className="button" type="button" onClick={() => setModalData(null)}>Close</button>
                    <button className="button" type="button" onClick={handleEdit}>Save changes</button>
                </div>
            </div>
        </div>

    )
}

export default Edit;