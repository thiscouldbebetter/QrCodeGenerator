
class QrCodeCellMask
{
	// To prevent large regions of the same color,
	// which are hard to scan correctly,
	// one of several predefined "masks" is selected
	// and applied to the data and error-correction cells.
	// When a cell in the mask has the value 1,
	// the corresponding data cell is inverted.

	constructor(id, name, cellAtPosIsInverted)
	{
		this.id = id;
		this.name = name;
		this._cellAtPosIsInverted = cellAtPosIsInverted;
	}

	static Instances()
	{
		if (QrCodeCellMask._instances == null)
		{
			QrCodeCellMask._instances = new QrCodeCellMask_Instances();
		}
		return QrCodeCellMask._instances;
	}

	static byId(id)
	{
		return QrCodeCellMask.Instances().byId(id);
	}

	cellAtPosIsInverted(cellPosInCells)
	{
		return this._cellAtPosIsInverted(cellPosInCells);
	}
}

class QrCodeCellMask_Instances
{
	constructor()
	{
		this.Vertical = new QrCodeCellMask
		(
			0,
			"Vertical",
			(cellPos) => (cellPos.x % 3 == 0)
		);

		this.Diagonal = new QrCodeCellMask
		(
			1,
			"Diagonal",
			(cellPos) => ((cellPos.x + cellPos.y) % 3 == 0)
		);

		this.Checkerboard = new QrCodeCellMask
		(
			2,
			"Checkerboard",
			(cellPos) => ((cellPos.x + cellPos.y) % 2 == 0)
		);

		this.Horizontal = new QrCodeCellMask
		(
			3,
			"Horizontal",
			(cellPos) => (cellPos.y % 2 == 0)
		);

		this.Eye = new QrCodeCellMask
		(
			4,
			"Eye",
			(cellPos) =>
			{
				var returnValue =
				(
					(
						(cellPos.x * cellPos.y % 3)
						+
						(cellPos.x * cellPos.y)
					)
					% 2
				) == 0

				return returnValue;
			}
		);

		this.Houndstooth = new QrCodeCellMask
		(
			5,
			"Houndstooth",
			(cellPos) =>
			{
				var returnValue =
				(
					(
						(cellPos.x * cellPos.y % 3)
						+
						(cellPos.x + cellPos.y)
					)
					% 2
				) == 0;

				return returnValue;
			}
		);

		this.Rectangles = new QrCodeCellMask
		(
			6,
			"Rectangles",
			(cellPos) =>
			{
				var returnValue =
				(
					(cellPos.x / 3 + cellPos.y / 2) % 2
				) == 0;

				return returnValue;
			}
		);

		this.BoxWithStar = new QrCodeCellMask
		(
			7,
			"BoxWithStar",
			(cellPos) =>
			{
				var returnValue =
				(
					(cellPos.x * cellPos.y) % 2
					+ (cellPos.x * cellPos.y) % 3
				) == 0;

				return returnValue;
			}
		);

		this._All =
		[
			this.Vertical,
			this.Diagonal,
			this.Checkerboard,
			this.Horizontal,
			this.Eye,
			this.Houndstooth,
			this.Rectangles,
			this.BoxWithStar
		];

		this._AllById = new Map(this._All.map(x => [x.id, x]));
	}

	byId(id)
	{
		return this._AllById.get(id);
	}
}
