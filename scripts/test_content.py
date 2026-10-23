import copy
import unittest
from unittest.mock import patch
import quadrath
from handbook import build_handbook


class ContentTests(unittest.TestCase):
    def test_named_weapon_bonus_is_rejected(self):
        data=copy.deepcopy(next(d for _,_,d in quadrath.documents() if d['type']=='equipment-catalog'))
        data['weapons'][0]['attack_bonus']={'guard-captain': 4}
        with self.assertRaisesRegex(ValueError,'integer default'):
            quadrath.validate_document(data,quadrath.CONTENT/'equipment/catalog.json')

    def test_equipped_bonus_must_match_weapon(self):
        entries=copy.deepcopy(list(quadrath.documents()))
        character=next(d for _,_,d in entries if d['type']=='character' and d.get('role')=='merchant')
        character['actions'][0]['equipment_attack_adjustment']=99
        with patch.object(quadrath,'documents',side_effect=lambda:iter(entries)):
            with self.assertRaisesRegex(ValueError,'resolved action bonus'):
                quadrath.validate(None)

    def test_damage_rejects_non_d6_roll(self):
        data=copy.deepcopy(next(d for _,_,d in quadrath.documents() if d['type']=='spell-catalog'))
        data['spells'][0]['damage']['roll']='2d20'
        with self.assertRaises(ValueError):
            quadrath.validate_document(data,quadrath.CONTENT/'magic/spells/catalog.json')

    def test_missing_spell_reference_rejected(self):
        entries=copy.deepcopy(list(quadrath.documents()))
        entries[0][2]['broken_ref']='spell.missing'
        with patch.object(quadrath,'documents',side_effect=lambda: iter(entries)):
            with self.assertRaisesRegex(ValueError,'broken reference'):
                quadrath.validate(None)

    def test_handbook_has_session_sections(self):
        text=build_handbook([d for _,_,d in quadrath.documents()])
        for section in ['At the table','Starting characters','Spells','Traps','Running Okla Deli','Session continuity']:
            self.assertIn('## '+section,text)
        self.assertNotIn('source_markdown',text)


if __name__=='__main__':
    unittest.main()
