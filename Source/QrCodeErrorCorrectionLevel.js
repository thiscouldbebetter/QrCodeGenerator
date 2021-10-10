
class QrCodeErrorCorrectionLevel
{
	constructor(id, name)
	{
		this.id = id;
		this.name = name;
	}

	static Instances()
	{
		if (QrCodeErrorCorrectionLevel._instances == null)
		{
			QrCodeErrorCorrectionLevel._instances = new QrCodeErrorCorrectionLevel_Instances();
		}
		return QrCodeErrorCorrectionLevel._instances;
	}

	static byId(id)
	{
		return QrCodeErrorCorrectionLevel.Instances().byId(id);
	}
}

class QrCodeErrorCorrectionLevel_Instances
{
	constructor()
	{
		this.Low = new QrCodeErrorCorrectionLevel(0, "Low");
		this.Medium = new QrCodeErrorCorrectionLevel(1, "Medium");
		this.Quartile = new QrCodeErrorCorrectionLevel(2, "Quartile");
		this.High = new QrCodeErrorCorrectionLevel(3, "High");

		this._All =
		[
			this.Low, this.Medium, this.Quartile, this.High
		];

		this._AllById = new Map(this._All.map(x => [x.id, x]));
	}

	byId(id)
	{
		return this._AllById.get(id);
	}
}
